package team.men4.dsmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team.men4.dsmap.model.dto.RegionWithMessagesDto;
import team.men4.dsmap.model.entity.RegionWithMessages;
import team.men4.dsmap.service.MessageService;

import java.util.List;

@RestController
@RequestMapping("/msg")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping
    public String event(){
        return "ok";
    }

    @GetMapping("/{lv1_name}/{lv2_name}/{lv3_name}")
    public List<RegionWithMessages> select(
            @PathVariable String lv1_name,
            @PathVariable String lv2_name,
            @PathVariable String lv3_name
    ){
        return messageService.selectMsg(lv1_name, lv2_name, lv3_name);
    }

    @GetMapping
    public List<RegionWithMessagesDto> selectAll(){return messageService.selectMsgAll();}
}
