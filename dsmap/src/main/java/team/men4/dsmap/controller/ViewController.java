package team.men4.dsmap.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.io.InputStream;

@Controller
@Slf4j
public class ViewController {

    @RequestMapping("/")
    public String mainPage(){
        log.info("index");
        return "index.html";
    }

    @RequestMapping("/map")
    public String mapPage(){
        log.info("map");
        return "mapContext.html";
    }

    @RequestMapping("/mainContext")
    public String jsPage(){
        log.info("mainContext");
        return "mainContext.html";
    }

    @RequestMapping("/msgList")
    public String main(){
        log.info("list");
        return "msgList.html";
    }
    
}
