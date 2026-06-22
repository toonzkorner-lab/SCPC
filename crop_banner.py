from PIL import Image
img = Image.open('public/images/banner.png')
width, height = img.size
# Let's see how much we can crop. 
# We'll crop 20% from top and 20% from bottom.
crop_top = int(height * 0.25)
crop_bottom = int(height * 0.75)
cropped_img = img.crop((0, crop_top, width, crop_bottom))
cropped_img.save('public/images/banner_cropped.png')
print(f"Original: {img.size}, Cropped: {cropped_img.size}")
