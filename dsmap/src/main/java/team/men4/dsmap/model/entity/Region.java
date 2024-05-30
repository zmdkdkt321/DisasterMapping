package team.men4.dsmap.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Region {
    private int id;
    private String lv1Name;
    private String lv2Name;
    private String lv3Name;
    private double x;
    private double y;

}
