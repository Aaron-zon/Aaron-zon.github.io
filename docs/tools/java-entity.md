# Java实体类转换

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TTextarea from './components/TTextarea/index.vue'

// 响应式数据
const sqlText = ref('')
const javaEntity = ref('')
const packageName = ref('com.example.entity')
const className = ref('Entity')
const generateToString = ref(false)

// SQL类型到Java类型的映射
const typeMap = {
  'int': 'Integer',
  'integer': 'Integer',
  'bigint': 'Long',
  'tinyint': 'Integer',
  'smallint': 'Integer',
  'mediumint': 'Integer',
  'decimal': 'BigDecimal',
  'numeric': 'BigDecimal',
  'float': 'Float',
  'double': 'Double',
  'varchar': 'String',
  'char': 'String',
  'text': 'String',
  'longtext': 'String',
  'mediumtext': 'String',
  'tinytext': 'String',
  'date': 'Date',
  'datetime': 'Date',
  'timestamp': 'Date',
  'time': 'Date',
  'year': 'Integer',
  'boolean': 'Boolean',
  'bit': 'Boolean'
}

// 将SQL字段名转换为Java属性名（驼峰命名）
const toCamelCase = (fieldName) => {
  // 先将所有字母转换为小写，然后处理下划线和首字母
  return fieldName.toLowerCase()
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^[a-z]/, (letter) => letter.toLowerCase())
}

// 解析SQL表结构
const parseSql = () => {
  try {
    const sql = sqlText.value.trim()
    if (!sql) {
      ElMessage.warning('请输入SQL表结构')
      return
    }

    // 按行分割处理
    const lines = sql.split('\n')
    const fields = []

    lines.forEach(line => {
      line = line.trim()
      if (!line) return

      // 匹配字段名和类型（只处理简单格式：字段名 类型）
      const match = line.match(/^\s*([a-zA-Z0-9_]+)\s+([a-zA-Z0-9]+)(?:\s*\(\s*\d+(?:,\s*\d+)?\s*\))?\s*$/)
      if (match) {
        const fieldName = match[1]
        let sqlType = match[2].toLowerCase()

        // 处理Oracle类型
        if (sqlType === 'varchar2') {
          sqlType = 'varchar'
        } else if (sqlType === 'number') {
          // 根据数字类型的精度判断Java类型
          const typeMatch = line.match(/number\s*\(\s*(\d+)(?:,\s*(\d+))?\s*\)/i)
          if (typeMatch) {
            const precision = parseInt(typeMatch[1])
            const scale = typeMatch[2] ? parseInt(typeMatch[2]) : 0
            if (scale > 0) {
              sqlType = 'decimal'
            } else if (precision <= 10) {
              sqlType = 'integer'
            } else {
              sqlType = 'bigint'
            }
          } else {
            sqlType = 'integer'
          }
        }

        fields.push({
          fieldName,
          sqlType,
          javaType: typeMap[sqlType] || 'String',
          javaName: toCamelCase(fieldName)
        })
      }
    })

    if (fields.length === 0) {
      ElMessage.warning('未提取到字段信息，请检查SQL格式')
      javaEntity.value = ''
      return
    }

    // 生成Java实体类
    generateJavaEntity(fields)
  } catch (error) {
    ElMessage.error('解析SQL失败，请检查SQL格式')
    javaEntity.value = ''
  }
}

// 生成Java实体类
const generateJavaEntity = (fields) => {
  let imports = 'import java.io.Serializable;\n'
  
  // 检查是否需要导入Date和BigDecimal
  const needsDate = fields.some(field => field.javaType === 'Date')
  const needsBigDecimal = fields.some(field => field.javaType === 'BigDecimal')
  
  if (needsDate) {
    imports += 'import java.util.Date;\n'
  }
  
  if (needsBigDecimal) {
    imports += 'import java.math.BigDecimal;\n'
  }
  
  // 生成类定义
  let entityCode = `package ${packageName.value};\n\n`
  entityCode += imports + '\n'
  entityCode += `public class ${className.value} implements Serializable {\n\n`
  entityCode += '    private static final long serialVersionUID = 1L;\n\n'
  
  // 生成字段定义（只保留属性，使用小驼峰命名）
  fields.forEach(field => {
    // 确保使用转换后的小驼峰名称
    const camelCaseName = toCamelCase(field.fieldName)
    entityCode += `    private ${field.javaType} ${camelCaseName};\n`
  })
  
  // 如果需要生成toString方法
  if (generateToString.value) {
    entityCode += '\n'
    entityCode += '    @Override\n'
    entityCode += '    public String toString() {\n'
    entityCode += `        return "${className.value}{" +\n`
    
    const toStringFields = fields.map(field => {
      const camelCaseName = toCamelCase(field.fieldName)
      return `                "${camelCaseName}=" + ${camelCaseName}`
    }).join(' + ", " +\n')
    
    entityCode += toStringFields + '\n'
    entityCode += '                + "}";\n'
    entityCode += '    }\n'
  }
  
  entityCode += '\n'
  entityCode += '}\n'
  
  javaEntity.value = entityCode
}

// 清空输入输出
const clear = () => {
  sqlText.value = ''
  javaEntity.value = ''
  packageName.value = 'com.example.entity'
  className.value = 'Entity'
  generateToString.value = false
}
</script>

<ClientOnly>
  <div class="java-entity-container">
    <h3>SQL表结构转Java实体类</h3>
    <div class="form-group">
      <el-form :inline="true" style="margin-bottom: 16px;">
        <el-form-item label="包名">
          <el-input v-model="packageName" placeholder="例如: com.example.entity" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="类名">
          <el-input v-model="className" placeholder="例如: User" style="width: 150px;" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="generateToString" label="toString">生成toString</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <TTextarea v-model:text="sqlText" placeholder="请输入SQL表结构，例如：
id	bigint auto_increment
username	varchar(50)
password	varchar(255)
real_name	varchar(50)
phone	varchar(20)
email	varchar(50)" />
    <div style="margin: 16px 0;">
      <el-button type="success" @click="parseSql">生成Java实体类</el-button>
      <el-button type="info" @click="clear">清空</el-button>
    </div>
    <TTextarea v-model:text="javaEntity" placeholder="生成的Java实体类" />
    <div style="margin-top: 20px; padding: 16px; background-color: #f5f7fa; border-radius: 4px;">
      <h4>使用说明：</h4>
      <ol>
        <li>在输入框中粘贴SQL表结构</li>
        <li>填写包名和类名</li>
        <li>点击"生成Java实体类"按钮</li>
        <li>右侧将生成对应的Java实体类代码</li>
        <li>支持自动转换字段类型、生成注解和getter/setter方法</li>
      </ol>
    </div>
  </div>
  
  <style scoped>
  .java-entity-container {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  h3 {
    margin-bottom: 20px;
  }
  
  h4 {
    margin-top: 0;
  }
  
  ol {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 5px 0;
  }
  </style>
</ClientOnly>
