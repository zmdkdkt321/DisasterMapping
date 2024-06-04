package team.men4.dsmap.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@Slf4j
public class SseService {

    private final List<SseEmitter> emitterList = new CopyOnWriteArrayList<>();

    public SseEmitter createEmitter() {
        SseEmitter sseEmitter = new SseEmitter(0L);

        emitterList.add(sseEmitter);
        log.info("size : {}", emitterList.size());
        return sseEmitter;
    }

    public void sendUpdateEvent(String data) {
        log.info("update emitter");

        for (SseEmitter emitter : emitterList) {
            try {
                emitter.send(data);
            } catch (IOException e) {
                emitter.complete();
                emitterList.remove(emitter);
            }
        }
    }
}

