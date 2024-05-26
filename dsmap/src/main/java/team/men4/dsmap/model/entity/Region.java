package team.men4.dsmap.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Region {
    private String lv1Name;
    private String lv2Name;
    private String lv3Name;
    private double x;
    private double y;

    public Region(String lv1Name, String lv2Name, String lv3Name) {
        this.lv1Name = lv1Name;
        this.lv2Name = lv2Name;
        this.lv3Name = lv3Name;
    }

}
