package team.men4.dsmap.eventbus;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/order/{productName}")
    private void order(@PathVariable String productName){
        orderService.order(productName);
        log.info("주문이 완료되었습니다");
    }
}
