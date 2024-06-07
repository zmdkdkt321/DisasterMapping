package team.men4.dsmap.eventbus;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class OrderService {
    ApplicationEventPublisher publisher;

    public void order(String productName){
        log.info(String.format("주문 로직 처리[상품명 : %s]", productName));
        publisher.publishEvent(new OrderedEvent(productName));
    }
}
