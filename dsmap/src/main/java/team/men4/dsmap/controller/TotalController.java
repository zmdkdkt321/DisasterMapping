package team.men4.dsmap.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.men4.dsmap.service.model.dto.RegionDto;
import team.men4.dsmap.service.model.dto.TotalDto;
import team.men4.dsmap.service.TotalService;

import java.util.List;
// TODO [spring] dto 검증
// TODO [spring] all 경로 제거
@Slf4j
@RestController
@RequestMapping("/total")
public class TotalController {
    @Autowired
    private TotalService totalService;

    @GetMapping
    public List<TotalDto> selectAll(){
        return totalService.selectTotal();
    }

    @GetMapping("/{lv1_name}/{lv2_name}/{lv3_name}")
    public int select(@PathVariable String lv1_name,
                        @PathVariable String lv2_name,
                        @PathVariable String lv3_name
                        )
    {
        RegionDto regionDto = new RegionDto(lv1_name, lv2_name, lv3_name);
        return totalService.selectTotalByRegion(regionDto);
    }

}
