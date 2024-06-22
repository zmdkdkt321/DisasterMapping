package team.men4.dsmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team.men4.dsmap.model.dto.MessageListDto;
import team.men4.dsmap.model.dto.RegionWithMessageDto;
import team.men4.dsmap.model.dto.RegionWithMessagesDto;
import team.men4.dsmap.model.entity.RegionWithMessage;
import team.men4.dsmap.model.entity.RegionWithMessages;
import team.men4.dsmap.service.MessageService;

import java.time.LocalDateTime;
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

    @GetMapping("/{offset}/{lv1_name}/{lv2_name}/{lv3_name}")
    public MessageListDto selectPage(
            @PathVariable int offset,
            @PathVariable String lv1_name,
            @PathVariable String lv2_name,
            @PathVariable String lv3_name,
            @RequestParam("start_date") String start,
            @RequestParam("end_date") String end
    ){
        return messageService.selectPage(offset, lv1_name, lv2_name, lv3_name, start, end);
    }

    @GetMapping
    public List<RegionWithMessagesDto> selectAll(){return messageService.selectMsgAll();}

}
