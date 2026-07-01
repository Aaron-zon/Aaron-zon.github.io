# 常用命令

```bash
docker images                 # 查看镜像
docker ps                     # 查看运行中的容器
docker ps -a                  # 查看所有容器

docker pull redis             # 下载镜像
docker build -t app:v1 .      # 构建镜像

docker run ...                # 创建并启动容器
docker stop 容器名             # 停止容器
docker start 容器名            # 启动已有容器
docker rm 容器名               # 删除容器

docker logs 容器名             # 查看日志
docker exec -it 容器名 bash    # 进入容器

docker compose up -d          # 启动整个项目
docker compose down           # 停止整个项目
```