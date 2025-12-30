#!/bin/bash
mkdir -p public/images

# Products
curl -L -o public/images/product-tee-olive.jpg "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-cargo-camo.jpg "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-rucksack-black.jpg "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-boot-brown.jpg "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-cap-khaki.jpg "https://images.unsplash.com/photo-1588850561407-ed78c282e89f?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-gloves-black.jpg "https://images.unsplash.com/photo-1621045246188-b4712acde3fa?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-jacket-green.jpg "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-shirt-black.jpg "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-keychain-cord.jpg "https://images.unsplash.com/photo-1623998020836-82ae8de3783c?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-patch-ir.jpg "https://images.unsplash.com/photo-1616423664074-325bdf255c2f?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/product-sling-black.jpg "https://images.unsplash.com/photo-1622560867746-b6d48083a216?q=80&w=800&auto=format&fit=crop"

# UI / Categories / Hero
curl -L -o public/images/ui-hero-ecosystem.jpg "https://images.unsplash.com/photo-1596716027429-79f83652617f?q=80&w=2000&auto=format&fit=crop"
curl -L -o public/images/ui-hero-monochrome.jpg "https://images.unsplash.com/photo-1542281286-9e0a56e2e224?q=80&w=2000&auto=format&fit=crop"
curl -L -o public/images/ui-hero-shells.jpg "https://images.unsplash.com/photo-1632125943269-6dc555237748?q=80&w=2000&auto=format&fit=crop"
curl -L -o public/images/ui-auth-login.jpg "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2000&auto=format&fit=crop"
curl -L -o public/images/ui-auth-register.jpg "https://images.unsplash.com/photo-1544175334-92736e4b2f2c?q=80&w=2000"
curl -L -o public/images/ui-cat-bottoms.jpg "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=800&auto=format&fit=crop"
curl -L -o public/images/ui-cat-accessories.jpg "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop"

echo "Download Complete"
