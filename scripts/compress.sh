#!/bin/bash

set -x

for image in docs/static/img/users_original/*.*; do
    filename=$(basename $image)
    target=docs/static/img/users/${filename%.*}.webp
    # 0 is used for width so the tool automatically adjusts it to conserve the space ratio
    cwebp -resize 0 128 $image -o $target
done