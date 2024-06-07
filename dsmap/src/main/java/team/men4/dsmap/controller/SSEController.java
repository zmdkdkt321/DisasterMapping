package team.men4.dsmap.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.men4.dsmap.service.SseService;

@RestController
@Slf4j
@RequestMapping("/events")
public class SSEController {

    private final SseService sseService;
    private int num =0;

    @Autowired
    public SSEController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(path="/1", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter handleSseRequest1() {
        return sseService.createEmitter();
    }

    @GetMapping(path="/2", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter handleSseRequest2() {
        return sseService.createEmitter();
    }

//    @Scheduled(fixedDelay = 3000)
    @GetMapping("/call")
    public String call(){
        log.info("catch call controller");

        num = num>5?--num:++num;

        String msg = "event "+ num;
        sseService.sendUpdateEvent(msg);
        return "ok";
    }
}