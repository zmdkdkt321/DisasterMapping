package team.men4.dsmap.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.men4.dsmap.service.SseService;

@RestController
@Slf4j
@RequestMapping("/events")
public class SSEController {

    private final SseService sseService;


    @Autowired
    public SSEController(SseService sseService) {
        this.sseService = sseService;
    }


    @GetMapping( produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter handleSseRequest() {
        return sseService.createEmitter();
    }


    @GetMapping("/call")
    public String call(@RequestParam  String name){
        log.info("catch call controller");
        return "ok";
    }
}