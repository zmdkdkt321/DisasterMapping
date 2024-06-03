package team.men4.dsmap.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.Schedules;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@Slf4j
public class SseService {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private int num =0;

    public SseEmitter createEmitter() {
        log.info("catch create emiiter");
        SseEmitter emitter = new SseEmitter();

        emitters.add(emitter);

        // 클라이언트가 연결을 종료할 때 처리
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));

        return emitter;
    }

    @Scheduled(fixedDelay = 2000)
    public void sendUpdateEvent( ) {
        log.info("send event {}", num);
        num++;
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send("update "+num);
            } catch (IOException e) {
                emitter.complete();
                emitters.remove(emitter);
            }
        }
    }
}

