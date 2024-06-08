package team.men4.dsmap.service.model.emitter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@Component
public class SseEmitterStorage {
    private final List<SseEmitter> emitterList = new CopyOnWriteArrayList<>();

    public void addEmitter(SseEmitter sseEmitter) {
        emitterList.add(sseEmitter);
        log.info(String.format("add SseEmitter(%d)", emitterList.size()));
    }

    public void removeEmitter(SseEmitter sseEmitter) {
        emitterList.remove(sseEmitter);
        log.info(String.format("del SseEmitter(%d)", emitterList.size()));
    }

    public void broadcast(String msg) {
        int num =0;

        for (SseEmitter emitter : emitterList) {
            try {
                emitter.send(msg);
                num++;
            } catch (IOException e) {
                emitter.complete();
            }
        }
        log.info(String.format("call SseEmitter(%d)", num));
    }
}