package team.men4.dsmap.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.men4.dsmap.service.SseService;

@Slf4j
@RestController
@RequestMapping("/sse")
public class SSEController {
    private final SseService sseService;

    @Autowired
    public SSEController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(path="/sub", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {
        log.info(String.format("connection detected"));
        return sseService.SSEConnect();
    }

    @PostMapping("pub")
    public String publish(@RequestBody String uptTime){
        log.info(String.format("event detected"));
        sseService.notifyEvent(uptTime);
        return "ok";
    }
}