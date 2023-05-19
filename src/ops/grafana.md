---
title: grafana
icon: markdown
order: 2
date: 2023-05-10
category:
  - 测试运维
tag:
  - linux
---

## 部署

```shell
docker pull bitnami/prometheus:latest
docker run -d --name=prometheus --net=host -v /opt/prometheus.yml:/opt/bitnami/prometheus/conf/prometheus.yml bitnami/prometheus:latest
docker pull grafana/grafana
docker run -d --name=grafana --net=host grafana/grafana:latest
```

- `grafana`访问地址`http://192.168.220.235:3000/`默认密码`admin/admin`
- `prometheus`访问地址`http://192.168.220.235:9090/`
- `grafana`监控模板下载地址`https://grafana.com/grafana/dashboards/`

## 监控linux

安装包github下载地址`https://github.com/prometheus/node_exporter`

```shell
./node_exporter >log.file 2>&1 &
curl http://localhost:9100/metrics
```

## prometheus配置

```yaml
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["localhost:9090"]
# add a new node
  - job_name: "prometheus_agent"
    static_configs:
      - targets: ["192.168.220.216:9100","192.168.220.215:9100"]
  - job_name: 'mysql'
    static_configs:
      - targets: ["192.168.220.215:9104"]
```

## 监控mysql

安装包github下载地址`https://github.com/prometheus/mysqld_exporter`

```shell
touch mysqld_exporter.cnf
nohup ./mysqld_exporter --config.my-cnf=mysqld_exporter.cnf &
curl http://localhost:9104/metrics
```

```conf
[client]
user=exporter
password=eXpIHB666QWE!
```

```sql
create user 'exporter'@'127.0.0.1'  IDENTIFIED BY 'eXpIHB666QWE!';
GRANT SELECT, PROCESS, SUPER, REPLICATION CLIENT, RELOAD ON *.* TO 'exporter'@'127.0.0.1';
```
