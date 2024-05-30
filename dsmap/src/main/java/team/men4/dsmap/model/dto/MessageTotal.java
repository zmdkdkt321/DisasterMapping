package team.men4.dsmap.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class MessageTotal {
    private String region;
    private Integer total;
    private Map<String, Integer> TodayStatics;


}
