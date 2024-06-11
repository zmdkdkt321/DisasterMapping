package team.men4.dsmap.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/img")
public class ImgController {

    @GetMapping(
            value = "/green",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getGreenMarker() throws IOException {
        InputStream in = getClass().getResourceAsStream(
                "/static/img/green.png");
        if (in != null) {
            byte[] bytes = in.readAllBytes();
            in.close();
            return bytes;
        } else {
            // 파일을 찾을 수 없는 경우 처리
            throw new IOException("이미지를 찾을 수 없습니다.");
        }
    }

    @GetMapping(
            value = "/yellow",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getYellowMarker() throws IOException {
        InputStream in = getClass().getResourceAsStream(
                "/static/img/yellow.png");
        if (in != null) {
            byte[] bytes = in.readAllBytes();
            in.close();
            return bytes;
        } else {
            // 파일을 찾을 수 없는 경우 처리
            throw new IOException("이미지를 찾을 수 없습니다.");
        }
    }

    @GetMapping(
            value = "/red",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getRedMarker() throws IOException {
        InputStream in = getClass().getResourceAsStream(
                "/static/img/red.png");
        if (in != null) {
            byte[] bytes = in.readAllBytes();
            in.close();
            return bytes;
        } else {
            // 파일을 찾을 수 없는 경우 처리
            throw new IOException("이미지를 찾을 수 없습니다.");
        }
    }
}
