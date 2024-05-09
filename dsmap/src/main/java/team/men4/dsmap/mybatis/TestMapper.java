package team.men4.dsmap.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import team.men4.dsmap.model.User;

import java.util.List;

@Repository
@Mapper
public interface TestMapper {
    public List<User> selectAll();

    public User select();

    public void insert(User user);

    public void update(User user);

    public void delete(long id);
}
