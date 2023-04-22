# get all .jpg files from docs/static/img/users_original directory
# compress them and save them in docs/static/img/users directory
# Requires Pillow library

def compress():
    import os
    from PIL import Image
    # path = os.path.join('docs', 'static', 'img', 'users_original')
    # target_path = os.path.join('docs', 'static', 'img', 'users')
    # files = os.listdir(path)
    path = 'docs/blog/2023'
    target_path = path
    files = ['compost-typed.jpg']
    for file in files:
        print(file)
        if file.endswith('.jpg'):
            img = Image.open(os.path.join(path, file))
            img.save(os.path.join(target_path, file.replace('.jpg', '.webp')), 'webp', optimize=True)

compress()