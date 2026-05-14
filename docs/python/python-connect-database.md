# python 连接数据库


## MySql

python3中，我们可以通过 `mysqlclient` 或 `pymysql` 三方库来接入mysql数据库。

**1.下载包**

安装pymysql，如果接入的是MySQL8，还需要一个名为 `cryptography` 的包，来支持MySQL的加密认证方式。

```
pip install pymysql cryptography
```

**2.连接数据库**

- 1.引入pymysql
- 2.创建连接
- 3.获取游标
- 4.执行sql语句
- 5.事务提交/回滚
- 6.关闭连接

```python
# 引入pymysql
import pymysql

# 2. 创建连接（Connection）
conn = pymysql.connect(host='127.0.0.1', port=3306,
                       user='账号', password='密码',
                       database='库名', charset='字符集（utf8mb4）')
try:
    # 3. 获取游标对象（Cursor）
    with conn.cursor() as cursor:
        # 4. 通过游标对象向数据库服务器发出SQL语句
        affected_rows = cursor.execute(
            'insert into `表名` values (%s, %s, %s)',
            ('字段1', '字段2', '字段3')
        )
        if affected_rows == 1:
            print('数据插入成功!!!')

    # 5. 提交事务（transaction）
    conn.commit()
except pymysql.MySQLError as err:
    # 5. 回滚事务
    conn.rollback()
    print(type(err), err)
finally:
    # 6. 关闭连接释放资源
    conn.close()
```

### 示例

**1.更新数据**

```python
import pymysql

no = int(input('部门编号: '))
name = input('部门名称: ')
location = input('部门所在地: ')

# 1. 创建连接（Connection）
conn = pymysql.connect(host='127.0.0.1', port=3306,
                       user='guest', password='Guest.618',
                       database='hrs', charset='utf8mb4')
try:
    # 2. 获取游标对象（Cursor）
    with conn.cursor() as cursor:
        # 3. 通过游标对象向数据库服务器发出SQL语句
        affected_rows = cursor.execute(
            'update `tb_dept` set `dname`=%s, `dloc`=%s where `dno`=%s',
            (name, location, no)
        )
        if affected_rows == 1:
            print('更新部门信息成功!!!')
    # 4. 提交事务
    conn.commit()
except pymysql.MySQLError as err:
    # 4. 回滚事务
    conn.rollback()
    print(type(err), err)
finally:
    # 5. 关闭连接释放资源
    conn.close()
```

**2.查询数据**

```python
import pymysql

# 1. 创建连接（Connection）
conn = pymysql.connect(host='127.0.0.1', port=3306,
                       user='guest', password='Guest.618',
                       database='hrs', charset='utf8mb4')
try:
    # 2. 获取游标对象（Cursor）
    with conn.cursor() as cursor:
        # 3. 通过游标对象向数据库服务器发出SQL语句
        cursor.execute('select `dno`, `dname`, `dloc` from `tb_dept`')
        # 4. 通过游标对象抓取数据
        row = cursor.fetchone()
        while row:
            print(row)
            row = cursor.fetchone()
except pymysql.MySQLError as err:
    print(type(err), err)
finally:
    # 5. 关闭连接释放资源
    conn.close()
```

**3.分页查询**

```python
import pymysql

page = int(input('页码: '))
size = int(input('大小: '))

# 1. 创建连接（Connection）
con = pymysql.connect(host='127.0.0.1', port=3306,
                      user='guest', password='Guest.618',
                      database='hrs', charset='utf8')
try:
    # 2. 获取游标对象（Cursor）
    with con.cursor(pymysql.cursors.DictCursor) as cursor:
        # 3. 通过游标对象向数据库服务器发出SQL语句
        cursor.execute(
            'select `eno`, `ename`, `job`, `sal` from `tb_emp` order by `sal` desc limit %s,%s',
            ((page - 1) * size, size)
        )
        # 4. 通过游标对象抓取数据
        for emp_dict in cursor.fetchall():
            print(emp_dict)
finally:
    # 5. 关闭连接释放资源
    con.close()
```

## 数据库标数据到处Excel

安装第三方库 `openpyxl`

```shell
pip install openpyxl
```

```python
import openpyxl
import pymysql

# 创建工作簿对象
workbook = openpyxl.Workbook()
# 获得默认的工作表
sheet = workbook.active
# 修改工作表的标题
sheet.title = '员工基本信息'
# 给工作表添加表头
sheet.append(('工号', '姓名', '职位', '月薪', '补贴', '部门'))
# 创建连接（Connection）
conn = pymysql.connect(host='127.0.0.1', port=3306,
                       user='guest', password='Guest.618',
                       database='hrs', charset='utf8mb4')
try:
    # 获取游标对象（Cursor）
    with conn.cursor() as cursor:
        # 通过游标对象执行SQL语句
        cursor.execute(
            'select `eno`, `ename`, `job`, `sal`, coalesce(`comm`, 0), `dname` '
            'from `tb_emp` natural join `tb_dept`'
        )
        # 通过游标抓取数据
        row = cursor.fetchone()
        while row:
            # 将数据逐行写入工作表中
            sheet.append(row)
            row = cursor.fetchone()
    # 保存工作簿
    workbook.save('hrs.xlsx')
except pymysql.MySQLError as err:
    print(err)
finally:
    # 关闭连接释放资源
    conn.close()
```