### Installation
```shell
sudo apt install nodejs docker-compose git && \
cd ~ && \
git clone https://github.com/poulou0/custom-nas.git && \
printf "[Unit]\nDescription=Start custom nas.\nAfter=multi-user.target\n\n[Service]\nType=simple\nExecStart=/usr/bin/node ${HOME}/custom-nas/dashboard/index.js\n\n[Install]\nWantedBy=multi-user.target\n" | sudo tee /etc/systemd/system/custom-nas.service && \
sudo systemctl enable custom-nas.service && \
sudo systemctl start custom-nas.service && \
cd custom-nas/ && \
sudo docker-compose up -d
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
