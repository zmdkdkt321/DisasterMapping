package team.men4.dsmap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.men4.dsmap.model.entity.Message;
import team.men4.dsmap.service.MessageService;

import java.util.List;

@RestController
@RequestMapping("/msg")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/1")
    public List<Message> select3(){
        return messageService.selectMsg3();
    }

    @GetMapping("/2")
    public List<Message> select2(){
        return messageService.selectMsg3();
    }

    @GetMapping("/3")
    public List<Message> select1(){
        return messageService.selectMsg3();
    }



}
