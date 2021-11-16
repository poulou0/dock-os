# BASIC
### Installation
```shell
cd ~ && \
sudo apt install -y ssh git docker-compose && \
git clone https://github.com/poulou0/custom-nas.git && \
sudo docker-compose -f ~/custom-nas/docker-compose.yml up -d
```

### Usage
* Dashboard: `https://<ip>`
* File manager: `http://<ip>:8000`
* MiniDLNA status: `http://<ip>:8200`

### File browser settings
Under Settings > Global Settings > Command runner > After Copy/Delete/Rename/Save/Upload
```shell
curl http://$(/sbin/ip route|awk '/default/ { print $3 }')/minidlna-rescan
```

# NERDIER

### File browser
NOT WORKING, but promising!
```shell
sudo docker-compose exec filebrowser /filebrowser cmds add after_copy "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }')/minidlna-rescan" && \
sudo docker-compose exec filebrowser /filebrowser cmds add after_delete "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }')/minidlna-rescan" && \
sudo docker-compose exec filebrowser /filebrowser cmds add after_rename "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }')/minidlna-rescan" && \
sudo docker-compose exec filebrowser /filebrowser cmds add after_save "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }')/minidlna-rescan" && \
sudo docker-compose exec filebrowser /filebrowser cmds add after_upload "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }')/minidlna-rescan"
```
To list them `sudo docker-compose exec filebrowser /filebrowser cmds ls`

### miniDLNA
Control url: `http://<ip>:8200/rootDesc.xml`

Example to get "All videos" XML
```shell
curl http://<ip>:8200/ContentDir.xml -H 'SOAPAction:urn:schemas-upnp-org:service:ContentDirectory:1#Browse' --data '<ObjectID>2$8</ObjectID><BrowseFlag>BrowseDirectChildren</BrowseFlag>'
```
Source: https://developer.sony.com/develop/audio-control-api/get-started/browse-dlna-file

### TODO

* Make a dialog to create the .env
* Use `spawn` instead of `exec` when needed.
* Make the containers as plugins
