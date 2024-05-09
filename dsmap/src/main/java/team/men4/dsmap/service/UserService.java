package team.men4.dsmap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import team.men4.dsmap.model.User;
import team.men4.dsmap.mybatis.TestMapper;

@Service
@Transactional
public class UserService {
    @Autowired
    TestMapper testMapper;

    @Autowired
    PlatformTransactionManager manager;

    public User select(){
        TransactionStatus status =
                manager.getTransaction(new DefaultTransactionDefinition());
        User user = new User();
        try{
            user = testMapper.select();
        }catch(Exception e){
            e.printStackTrace();
        }
        return user;
    }
}
