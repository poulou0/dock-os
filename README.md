### Installation
```shell
cd ~ && \
sudo apt install git docker-compose && \
git clone https://github.com/poulou0/custom-nas.git && \
sudo docker-compose -f ~/custom-nas/docker-compose.yml up -d
```

### Usage
* File manager: `http://<ip>`
* Dashboard: `http://<ip>:8000`
* MiniDLNA status: `http://<ip>:8200`

### Run manually
```shell
sudo docker-compose up -d && node dashboard/index.js
```

### File manager settings
Under Settings > Global Settings > Command runner > After Copy/Delete/Rename/Save/Upload
```shell
curl http://$(/sbin/ip route|awk '/default/ { print $3 }'):8000/minidlna-rescan
```
OR (NOT WORKING!! but promising)
```shell
sudo docker-compose exec filemanager /filebrowser cmds add after_copy "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }'):8000/minidlna-rescan" && \
sudo docker-compose exec filemanager /filebrowser cmds add after_delete "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }'):8000/minidlna-rescan" && \
sudo docker-compose exec filemanager /filebrowser cmds add after_rename "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }'):8000/minidlna-rescan" && \
sudo docker-compose exec filemanager /filebrowser cmds add after_save "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }'):8000/minidlna-rescan" && \
sudo docker-compose exec filemanager /filebrowser cmds add after_upload "curl http://\$(/sbin/ip route|awk '/default/ { print \$3 }'):8000/minidlna-rescan"
```
To list them `sudo docker-compose exec filemanager /filebrowser cmds ls`
