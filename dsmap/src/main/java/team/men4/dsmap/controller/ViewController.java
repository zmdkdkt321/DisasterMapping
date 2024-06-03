package team.men4.dsmap.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
public class ViewController {

    @RequestMapping("/view")
    public String viewPage(){
        return "view";
    }

    @RequestMapping("/")
    public String mainPage(){
        log.info("index");
        return "index.html";
    }

    @RequestMapping("/map")
    public String mapPage(){
        log.info("map");
        return "map.html";
    }

    @RequestMapping("/indexContext")
    public String jsPage(){
        log.info("indexContext");
        return "indexContext.html";
    }

    @RequestMapping("/msgList")
    public String main(){
        log.info("list");
        return "msgList.html";
    }

    @GetMapping("/comment")
    public String index(){
        return "cindex";
    }
}
