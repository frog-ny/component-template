#!/bin/bash
imageName=exa-demo
containerName=exa-component-template

docker build --no-cache -t $imageName -f Dockerfile  .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -it -d -p 3000:3000 --name $containerName -v $(pwd):/www/ $imageName