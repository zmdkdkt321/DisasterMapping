package team.men4.dsmap.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.men4.dsmap.model.emitter.SseEmitterStorage;

import java.io.IOException;

import static org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;
import static org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event;

@Service
@Slf4j
public class SseService {
    static final long CONNECT_TIMEOUT = 3600000L;
    static final long RECONNECT_TIME = 2000L;

    private final SseEmitterStorage storage;

    @Autowired
    public SseService(SseEmitterStorage sseEmitterStorage){
        this.storage = sseEmitterStorage;
    }

    public SseEmitter SSEConnect() {
        SseEmitter sseEmitter = createEmitter();
        storage.addEmitter(sseEmitter);

        return sseEmitter;
    }

    public void notifyEvent(String msg) {
        storage.broadcast(msg);
    }

    public SseEmitter createEmitter( ) {
        SseEmitter sseEmitter = new SseEmitter(CONNECT_TIMEOUT);

        sseEmitter.onTimeout(sseEmitter::complete);
        sseEmitter.onCompletion(() -> storage.removeEmitter(sseEmitter));

        SseEventBuilder sseEventBuilder = event()
                .name("event")
                .data("connected")
                .reconnectTime(RECONNECT_TIME);
        try {
            sseEmitter.send(sseEventBuilder);
        } catch (IOException e) {
            sseEmitter.complete();
        }
        log.info(String.format("create SseEmitter"));
        return sseEmitter;
    }

}

