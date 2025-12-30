#!/bin/bash

# Define function to safe move (source -> dest)
# If source exists, move it. If dest exists (from successful download), keep dest (download is fresher? or maybe stick to local).
# Actually, the user wants "Unsplash" images. 5 downloads succeeded. The rest failed.
# I will prefer the DOWNLOADED (new) file if it is > 1KB.
# Else I will use the OLD LOCAL file.

safe_move() {
    src=$1
    dest=$2
    
    # Check if a valid download already exists at dest (size > 1000 bytes)
    if [ -f "$dest" ] && [ $(wc -c < "$dest") -gt 1000 ]; then
        echo "Keeping downloaded $dest"
        # Remove source if we aren't using it
        [ -f "$src" ] && rm "$src"
    else
        # Move source to dest if source exists
        if [ -f "$src" ]; then
            echo "Using local backup for $dest"
            mv "$src" "$dest"
        else
            echo "MISSING ASSET: Neither download nor local backup found for $dest"
        fi
    fi
}

# Products
safe_move "public/images/tshirt_olive.jpg" "public/images/product-tee-olive.jpg"
safe_move "public/images/cargo_camo.jpg" "public/images/product-cargo-camo.jpg"
safe_move "public/images/backpack_black.jpg" "public/images/product-rucksack-black.jpg"
safe_move "public/images/boots_brown.jpg" "public/images/product-boot-brown.jpg"
safe_move "public/images/cap_khaki.jpg" "public/images/product-cap-khaki.jpg"
safe_move "public/images/gloves_black.jpg" "public/images/product-gloves-black.jpg"
safe_move "public/images/oe2.jpg" "public/images/product-jacket-green.jpg"
safe_move "public/images/oe1.jpg" "public/images/product-shirt-black.jpg"
safe_move "public/images/keychain_tactical.jpg" "public/images/product-keychain-cord.jpg"
safe_move "public/images/patch_ir.jpg" "public/images/product-patch-ir.jpg"
safe_move "public/images/slingbag_tactical.jpg" "public/images/product-sling-black.jpg"

# UI
safe_move "public/images/hero2.jpg" "public/images/ui-hero-ecosystem.jpg"
safe_move "public/images/hero3.jpg" "public/images/ui-hero-monochrome.jpg"
safe_move "public/images/hero4.jpg" "public/images/ui-hero-shells.jpg"
safe_move "public/images/hero5.jpg" "public/images/ui-auth-login.jpg"
safe_move "public/images/oe3.jpg" "public/images/ui-auth-register.jpg"

# Categories (Reusing existing/renamed assets where appropriate)
# Bottoms -> cargo_camo (already moved to product-cargo-camo.jpg). Need a copy?
# No, I'll point the code to the same file.
# Accessories -> gloves (product-gloves-black.jpg).

# Remove legacy broken/unused files
rm -f public/images/oe4.jpg public/images/oe5.jpg public/images/hero1.jpg public/images/herop1.jpg

echo "Asset Rename Complete"
ls -lh public/images/
