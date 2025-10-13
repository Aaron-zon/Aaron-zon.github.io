# springboot 文件下载

假如我要下载项目钟 resources/static/template 下的文件。

```java
@RestController
public class DownloadController {

    @GetMapping("/download/template/{fileName}")
    public void download(@PathVariable String fileName, HttpServletResponse response) {

        // 获取文件路径
        String filePath = "static/template/" + fileName;
        // 获取文件 resource
        ClassPathResource resource = new ClassPathResource(filePath);
        // 确认文件是否存在
        if (!resource.exists()) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        // 文件传输
        try (InputStream in = resource.getInputStream();
             OutputStream out = response.getOutputStream()) {

            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(fileName, "UTF-8"));

            byte[] buffer = new byte[1024];
            int len;
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
```