package team.men4.dsmap.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import team.men4.dsmap.model.User;

@Repository
@Mapper
public interface TestMapper {
    public User select();
}
