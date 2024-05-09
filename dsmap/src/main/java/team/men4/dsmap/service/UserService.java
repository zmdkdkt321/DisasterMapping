package team.men4.dsmap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import team.men4.dsmap.model.User;
import team.men4.dsmap.mybatis.TestMapper;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserService {
    @Autowired
    TestMapper testMapper;

    @Autowired
    PlatformTransactionManager manager;

    public List<User> selectAll(){
        List<User> users = new ArrayList<>();

        TransactionStatus status =
                manager.getTransaction(new DefaultTransactionDefinition());
        User user = new User();
        try{
            users = testMapper.selectAll();
        }catch(Exception e){
            e.printStackTrace();
        }
        return users;
    }

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

    public void insert(User user){
        TransactionStatus status =
                manager.getTransaction(new DefaultTransactionDefinition());
        try{
            testMapper.insert(user);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public void update(User user){
        TransactionStatus status =
                manager.getTransaction(new DefaultTransactionDefinition());
        try{
            testMapper.update(user);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public void delete(long id){
        TransactionStatus status =
                manager.getTransaction(new DefaultTransactionDefinition());
        try{
            testMapper.delete(id);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
