import{T as h}from"./chunks/index.swxsCI9K.js";import{ax as L,r as g,A as N,B as n,O as _,R as o,J as p,al as d,z as B}from"./chunks/framework.BWRXlwpK.js";import{E as S}from"./chunks/theme.CfURUAMU.js";const J={class:"java-entity-container"},T={class:"form-group"},k={style:{margin:"16px 0"}},O=JSON.parse('{"title":"Java实体类转换","description":"","frontmatter":{},"headers":[],"relativePath":"tools/java-entity.md","filePath":"tools/java-entity.md"}'),E={name:"tools/java-entity.md"},I=Object.assign(E,{setup(w){const f=g(""),c=g(""),y=g("com.example.entity"),v=g("Entity"),x=g(!1),j={int:"Integer",integer:"Integer",bigint:"Long",tinyint:"Integer",smallint:"Integer",mediumint:"Integer",decimal:"BigDecimal",numeric:"BigDecimal",float:"Float",double:"Double",varchar:"String",char:"String",text:"String",longtext:"String",mediumtext:"String",tinytext:"String",date:"Date",datetime:"Date",timestamp:"Date",time:"Date",year:"Integer",boolean:"Boolean",bit:"Boolean"},b=r=>r.toLowerCase().replace(/_([a-z])/g,(e,m)=>m.toUpperCase()).replace(/^[a-z]/,e=>e.toLowerCase()),C=()=>{try{const r=f.value.trim();if(!r){S.warning("请输入SQL表结构");return}const e=r.split(`
`),m=[];if(e.forEach(i=>{if(i=i.trim(),!i)return;const t=i.match(/^\s*([a-zA-Z0-9_]+)\s+([a-zA-Z0-9]+)(?:\s*\(\s*\d+(?:,\s*\d+)?\s*\))?\s*$/);if(t){const l=t[1];let a=t[2].toLowerCase();if(a==="varchar2")a="varchar";else if(a==="number"){const u=i.match(/number\s*\(\s*(\d+)(?:,\s*(\d+))?\s*\)/i);if(u){const s=parseInt(u[1]);(u[2]?parseInt(u[2]):0)>0?a="decimal":s<=10?a="integer":a="bigint"}else a="integer"}m.push({fieldName:l,sqlType:a,javaType:j[a]||"String",javaName:b(l)})}}),m.length===0){S.warning("未提取到字段信息，请检查SQL格式"),c.value="";return}D(m)}catch{S.error("解析SQL失败，请检查SQL格式"),c.value=""}},D=r=>{let e=`import java.io.Serializable;
`;const m=r.some(l=>l.javaType==="Date"),i=r.some(l=>l.javaType==="BigDecimal");m&&(e+=`import java.util.Date;
`),i&&(e+=`import java.math.BigDecimal;
`);let t=`package ${y.value};

`;if(t+=e+`
`,t+=`public class ${v.value} implements Serializable {

`,t+=`    private static final long serialVersionUID = 1L;

`,r.forEach(l=>{const a=b(l.fieldName);t+=`    private ${l.javaType} ${a};
`}),x.value){t+=`
`,t+=`    @Override
`,t+=`    public String toString() {
`,t+=`        return "${v.value}{" +
`;const l=r.map(a=>{const u=b(a.fieldName);return`                "${u}=" + ${u}`}).join(` + ", " +
`);t+=l+`
`,t+=`                + "}";
`,t+=`    }
`}t+=`
`,t+=`}
`,c.value=t},V=()=>{f.value="",c.value="",y.value="com.example.entity",v.value="Entity",x.value=!1};return(r,e)=>{const m=d("el-input"),i=d("el-form-item"),t=d("el-checkbox"),l=d("el-form"),a=d("el-button"),u=d("ClientOnly");return B(),N("div",null,[e[10]||(e[10]=n("h1",{id:"java实体类转换",tabindex:"-1"},[_("Java实体类转换 "),n("a",{class:"header-anchor",href:"#java实体类转换","aria-label":'Permalink to "Java实体类转换"'},"​")],-1)),o(u,null,{default:p(()=>[n("div",J,[e[8]||(e[8]=n("h3",null,"SQL表结构转Java实体类",-1)),n("div",T,[o(l,{inline:!0,style:{"margin-bottom":"16px"}},{default:p(()=>[o(i,{label:"包名"},{default:p(()=>[o(m,{modelValue:y.value,"onUpdate:modelValue":e[0]||(e[0]=s=>y.value=s),placeholder:"例如: com.example.entity",style:{width:"200px"}},null,8,["modelValue"])]),_:1}),o(i,{label:"类名"},{default:p(()=>[o(m,{modelValue:v.value,"onUpdate:modelValue":e[1]||(e[1]=s=>v.value=s),placeholder:"例如: User",style:{width:"150px"}},null,8,["modelValue"])]),_:1}),o(i,null,{default:p(()=>[o(t,{modelValue:x.value,"onUpdate:modelValue":e[2]||(e[2]=s=>x.value=s),label:"toString"},{default:p(()=>e[5]||(e[5]=[_("生成toString")])),_:1},8,["modelValue"])]),_:1})]),_:1})]),o(h,{text:f.value,"onUpdate:text":e[3]||(e[3]=s=>f.value=s),placeholder:`请输入SQL表结构，例如：
id	bigint auto_increment
username	varchar(50)
password	varchar(255)
real_name	varchar(50)
phone	varchar(20)
email	varchar(50)`},null,8,["text"]),n("div",k,[o(a,{type:"success",onClick:C},{default:p(()=>e[6]||(e[6]=[_("生成Java实体类")])),_:1}),o(a,{type:"info",onClick:V},{default:p(()=>e[7]||(e[7]=[_("清空")])),_:1})]),o(h,{text:c.value,"onUpdate:text":e[4]||(e[4]=s=>c.value=s),placeholder:"生成的Java实体类"},null,8,["text"]),e[9]||(e[9]=n("div",{style:{"margin-top":"20px",padding:"16px","background-color":"#f5f7fa","border-radius":"4px"}},[n("h4",null,"使用说明："),n("ol",null,[n("li",null,"在输入框中粘贴SQL表结构"),n("li",null,"填写包名和类名"),n("li",null,'点击"生成Java实体类"按钮'),n("li",null,"右侧将生成对应的Java实体类代码"),n("li",null,"支持自动转换字段类型、生成注解和getter/setter方法")])],-1))])]),_:1})])}}}),q=L(I,[["__scopeId","data-v-7802ee3a"]]);export{O as __pageData,q as default};
