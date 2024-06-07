package team.men4.dsmap.eventbus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class OrderedEvent {
    private String productName;
}
