---
layout: fable-blog-page
title: Flutter State in F# with Fable and Redux
author: Ben Copeland
date: 2022-09-13
author_link: https://blog.bencope.land/
author_image: https://github.com/bentok.png
# external_link:
abstract: |
  Although Fable 4 is still pre-release, the Dart compilation works great - so great that I was able to migrate the entirety of my Redux state management in a Flutter app over to F#. Being able to model data and dispatch actions in F# has made Flutter so much nicer to work with, so in this post I'll be sharing info about how to do the same approach in your own Flutter app.
---

![fhsarp loves dart](../../static/img/blog/fsharp_loves_dart.png)

> This article was originally posted [here](https://blog.bencope.land/flutter-state-in-f-with-fable-and-redux/).

[Fable 4.0 is on the horizon](https://fable.io/blog/2022/2022-06-06-Snake_Island_alpha.html) 🎉 and with it comes the ability to compile F# code to Dart. Although Fable 4 is still pre-release, the Dart compilation works great - so great that I was able to migrate the entirety of my Redux state management in a Flutter app over to F#. Being able to model data and dispatch actions in F# has made Flutter so much nicer to work with, so in this post I'll be sharing info about how to do the same approach in your own Flutter app.

I'd like to note up front that my approach here uses only the Fable 4 built-in Dart bindings, and I kept my Flutter widgets in Dart for now. It is possible write full-on Flutter widgets, as seen in [this repo](https://github.com/alfonsogarciacaro/fable-flutterapp), however for now it does require copying over the bindings from that repo at least until 4.0 is officially released. However, in my case I already had a sizable app that would have required making bindings for dozens of libraries and I was contrained on time. Since my Redux architecture did not involve any libraries and modelling state is a particularly verbose process in Dart, I determined that state would be a great place to start and that I could port the rest to F# later.

## Elegant Models in F#
Flutter Redux is a pretty lightweight library in which you can write actions and reducers in plain Dart classes, combine them into a single app reducer, create a store which uses that reducer and use that store to update the state of all descendent widgets. I won't go into how to use Flutter Redux (here's a good article on that), other than covering important information with regards to using F# with it.
For the most part, using Redux in Flutter can be written in pure Dart - which means that with Fable you can write that same code in F# with no need for additional Fable bindings. Consider this user model:

```Dart
import 'package:flutter/material.dart';

@immutable
class UserModel {
  final String firstName;
  final String lastName;
  final String email;

  const UserModel({
    this.firstName = '',
    this.lastName = '',
    this.email = '',
  });
  
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ClassSliceModel &&
          runtimeType == other.runtimeType &&
          firstName == other.lastName &&
          lastName == other.lastName &&
          email == other.email;

  @override
  int get hashCode =>
      firstName.hashCode ^
      lastname.hashCode ^
      email.hashCode;
}
```

Now with Fable, we can write the same code as follows:

```F#
type UserModel =
    { firstName: string
      lastName: string
      email: string }
```

The above compiles to the same original Dart code (minus the @immutable decorator from Material). The compiled file `user_model.fs`.dart can now be imported and used in a Dart file just like the original model.

## Actions

In Flutter Redux, actions also can be written in pure Dart which, again, means that we'll have no problem writing the same thing in F#. Given the UserModel class above, here is what the Redux actions might look like.

```Dart
class FirstNameChanged {
  String firstName;

  FirstNameChanged(this.firstName);
}

class LastNameChanged {
  String lastName;

  LastNameChanged(this.lastName);
}

class EmailChanged {
  String email;

  EmailChanged(this.email);
}
```

The same in F#:

```F#
type UserActions =
    | FirstNameChanged of string
    | LastNameChanged of string
    | EmailChanged of string
```

## Reducers

Reducers in Dart tend to be large if/else statements, or maybe switch statements, which check for the type of the action and look like this:

```Dart
UserModel userReducer(UserModel state, dynamic action) {
  if (action is FirstNameChanged) {
    return UserModel(
      firstName: action.firstName,
      lastName: state.lastName,
      email: state.email,
    );
  }
  if (action is LastNameChanged) {
    return UserModel(
      firstName: state.firstName,
      lastName: action.lastName,
      email: state.email,
    );
  }
  if (action is EmailChanged) {
    return UserModel(
      firstName: state.firstName,
      lastName: state.lastName,
      email: action.email,
    );
  }
  return state;
}
```

The same in F#:

```F#
let userReducer (state: AppStateModel, action: UserActions) =
    { state with
        user =
            match action with
            | FirstNameChanged x -> { state.user with firstName = x }
            | LastNameChanged x -> { state.user with lastName = x }
            | EmailChanged x -> { state.user with email = x } }

```

One other thing to note is that, while Dart could have independent, modular reducers because of the `dynamic` type, in F# we'll need to have a single global discriminated union to allow us to pattern match on which reducer within the global state we need to dispatch to. So we'll also have a reducer that looks like this for the whole app:

```F#
type AppActions =
    | UserDispatch of UserActions

let appReducer (state, action) =
    match action with
    | UserDispatch action -> userReducer (state, action)
```

## Dispatching Events

Now with the essential elements of a Redux state converted from Dart to F#, we can look at how to dispatch events. Before with Dart, we'd dispatch an event by importing the Action class directly like so:

```Dart
store.dispatch(FirstNameChanged('Bob'));
```

The F# code compiles disciminated unions to functions that are namespaced by the type's name. So `FirstNameChanged` on the UserActions discriminated union compiles to `UserActions_FirstNameChanged`. But also remember that the root reducer is now a monolithic state instead of a modular one, so we also need to dispatch the top-level reducer's action. Given the appReducer above, it would look like this `AppActions_UserDispatch(UserActions_FirstNameChanged('Bob'))`.

That is a bit verbose though, so we can create functions in F# that compose the correct functions together in a friendlier name:

```F#
let firstNameChanged =
    UserDispatch << FirstNameChanged
```

Now in our Dart code we can dispatch our actions by importing the function we just wrote in F# with `store.dispatch(firstNameChanged('Bob'))`.

## Selectors

Having all of this code in F# is already making state management much more pleasant, but there's a cherry on top as well. Although Dart has some nice built in utilities for collections, now you have access to wonderful FShare.Core modules such as the List module. So now you can create a UserSelectors module to grab data from the store and easily shape it - stuff like this:

```Dart
selectUsersGroupedByCompany(state)
    .map((e) => buildSomeWidget(e));
```

Where `selectUsersGroupedByCompany` is written in F# like so:

```F#
let selectUsersGroupedByCompany state =
    state.users
    |> List.groupBy (fun u -> u.Company)
```

Although `groupBy` isn't a great example because you can do it fairly tersely in Dart, a lot of more verbose Dart code can now be written written in F# utilities.

## Conclusion

Fable 4 now gives us the ability to compile F# to Dart, and it's been an incredibly smooth process for me, even with it only just now reaching beta. In my case, I have a hybrid application with both Dart code and F# code. The most expedient approach for me for now was to only write my state in F# and much of the most imporant logic ended up there, while I left the dependency-heavy widgets in Dart for now. Interacting with the compiled code from Dart files has been pleasant as well.

Despite only having partially written my app with Fable, I look forward to eventually writing everything with it (I also would like to try writing a game in Flutter and F#). If you are a Dart or Flutter developer who loves F#, you should definitely give it a try.