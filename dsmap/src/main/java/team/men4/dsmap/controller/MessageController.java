package team.men4.dsmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.men4.dsmap.service.model.dto.RegionWithMessagesDto;
import team.men4.dsmap.service.model.entity.RegionWithMessages;
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

    @GetMapping
    public List<RegionWithMessages> select(){
        return messageService.selectMsg();
    }

    @GetMapping("/all")
    public List<RegionWithMessagesDto> selectAll(){return messageService.selectMsgAll();}
}
