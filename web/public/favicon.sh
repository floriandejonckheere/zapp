#!/usr/bin/sh -e
#
# Generate various sized favicons
#

SOURCE="favicon.svg"
FAVICON="favicon.ico"

convert -background none -resize 16x16 ${SOURCE} /tmp/favicon-16.png
convert -background none -resize 32x32 ${SOURCE} /tmp/favicon-32.png
convert -background none -resize 64x64 ${SOURCE} /tmp/favicon-64.png
convert /tmp/favicon-16.png /tmp/favicon-32.png /tmp/favicon-64.png ${FAVICON}

convert -background none -resize 192x192 ${SOURCE} logo192.png
convert -background none -resize 256x256 ${SOURCE} logo256.png
convert -background none -resize 512x512 ${SOURCE} logo512.png

echo "Generated ${FAVICON}"
