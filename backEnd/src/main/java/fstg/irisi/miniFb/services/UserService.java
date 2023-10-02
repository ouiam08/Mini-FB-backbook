package fstg.irisi.miniFb.services;

import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.mappers.UserMapper;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.repositories.FbUserRepository;
import fstg.irisi.miniFb.domain.representations.UserRepresentation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final FbUserRepository userRepository;


    public UserRepresentation getById(int id){
        return userMapper.convertToUserRepresentation(userRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("not.found.user with id"+id))) ;
    }
    public UserRepresentation update(UserCommand userCommand){
        FBUser user =  userRepository.findById(userCommand.getId())
                .orElseThrow(()-> new IllegalArgumentException("not.found.user with id"+userCommand.getId()));
        user.setUserName(userCommand.getName());
        user.setUserPassword(userCommand.getPassword());
        user.setUserDescription(userCommand.getDescription());

        return userMapper.convertToUserRepresentation(user);
    }

    public  String delete(int id){
        if(id !=0){
            userRepository.deleteById(id);
        }
        return "User deleted!";
    }
}
