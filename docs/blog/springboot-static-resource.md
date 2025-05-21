# springboot 静态资源访问

## 环境

**springboot**: 3.1.5

**java**：17

**配置文件**: src/main/resources/`application.yml`

**项目结构**:

```
src/
 └─ main/
     └─ resources/
         └─ static/
             └─ pdf/
                 └─ 1.pdf
```

**需求**: 

- 1.访问 `1.pdf`，不依赖接口浏览器直接浏览此文件
- 2.拒绝访问时（HTTP ERROR 403）
- 3.设置其他静态目录

## Spring Boot 静态资源映射机制

Spring Boot 默认情况下就会把 `src/main/resources/static` 目录当成静态资源目录。也就是说：

要访问 `src/main/resources/static/pdf/1.pdf` 只需启动项目后，直接访问：

```
http://127.0.0.1:8080/pdf/1.pdf
```

也就是说，放在 static/pdf/ 下的所有文件，都会自动映射到 http://localhost:8080/pdf/ 下面。

**映射规则**：

| 优先级 | 路径前缀 | 对应目录                     |
| :---   | :--- | :------------------------------- |
| 1️⃣     | `/`  | `classpath:/META-INF/resources/` |
| 2️⃣     | `/`  | `classpath:/resources/`          |
| 3️⃣     | `/`  | `classpath:/static/`             |
| 4️⃣     | `/`  | `classpath:/public/`             |

这几个文件夹可能同时存在，如果但他们的映射路径都为 `/`。

**静态资源优先级查找顺序**:

如果几个文件夹中都有相同的文件（如：在 `static` 和 `public` 文件夹内同时存在 `1.pdf`），那么Spring Boot 会根据上表中 **优先级** 的顺序来查找。

## 1.访问静态资源

直接访问：

```
http://127.0.0.1:8080/pdf/1.pdf
```

## 2.拒绝访问时（HTTP ERROR 403）

如果在访问静态资源时出现了错误（HTTP ERROR 403），可能是项目中验证机制出现了问题

如果使用了类似 Spring Security的框架（哪怕是 spring-boot-starter-security 依赖在项目里），默认所有的路径都需要验证。

**解决办法**: 放行静态资源路径，在配置中将 `/pdf/**` 传入到 `requestMatchers` 方法中，使在访问此路径资源时可以放行。

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
          .csrf().disable()
          .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
          .and().authorizeHttpRequests()
          .requestMatchers("/users/login", "/users/code", "/pdf/**")
          .anonymous()
          .anyRequest().authenticated();

        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.logout().disable();

        return http.build();
    }
    ...
}

```

## 3.设置其他静态目录

