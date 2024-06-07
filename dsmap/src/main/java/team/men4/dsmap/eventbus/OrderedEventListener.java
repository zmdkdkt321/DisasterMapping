package team.men4.dsmap.eventbus;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class OrderedEventListener {

    @Async
    @EventListener
    public void sendPush(OrderedEvent event) throws InterruptedException{
        Thread.sleep(1500);
        log.info(String.format("푸시 메세지 발송 [사 품명 : %s]", event.getProductName()));
    }

    @Async
    @EventListener
    public void sendEmail(OrderedEvent event) throws InterruptedException{
        Thread.sleep(2500);
        log.info(String.format("메일 전송 [사품명 : %s]", event.getProductName()));
    }

}
