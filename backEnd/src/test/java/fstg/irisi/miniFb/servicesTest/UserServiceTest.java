package fstg.irisi.miniFb.servicesTest;

import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.mappers.UserMapper;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.repositories.FbUserRepository;
import fstg.irisi.miniFb.domain.representations.UserRepresentation;
import fstg.irisi.miniFb.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserServiceTest {
    @Mock
    private UserMapper userMapper;

    @Mock
    private FbUserRepository userRepository;
    @InjectMocks
    private UserService userService;


    @Test
    void shouldGetUserById_ExistingUser() {
        int userId = 1;
        FBUser user = new FBUser();
        user.setUserId(userId);
        user.setUserName("John");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        UserRepresentation expectedRepresentation = new UserRepresentation();
        expectedRepresentation.setId(userId);
        expectedRepresentation.setName("John");

        when(userMapper.convertToUserRepresentation(user)).thenReturn(expectedRepresentation);

        UserRepresentation result = userService.getById(userId);

        assertEquals(expectedRepresentation, result);
    }

    @Test
    void shouldGetUserById_NonExistingUser() {
        int userId = 1;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> userService.getById(userId));
    }

    @Test
    void shouldUpdateUser() {
        int userId = 1;
        UserCommand userCommand = new UserCommand();
        userCommand.setId(userId);
        userCommand.setName("Updated Name");
        userCommand.setPassword("Updated Password");
        userCommand.setDescription("Updated Description");

        FBUser existingUser = new FBUser();
        existingUser.setUserId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));

        UserRepresentation updatedRepresentation = new UserRepresentation();
        updatedRepresentation.setId(userId);
        updatedRepresentation.setName("Updated Name");
        updatedRepresentation.setPassword("Updated Password");
        updatedRepresentation.setDescription("Updated Description");

        when(userMapper.convertToUserRepresentation(existingUser)).thenReturn(updatedRepresentation);

        UserRepresentation result = userService.update(userCommand);

        assertEquals(updatedRepresentation, result);
        assertEquals("Updated Name", existingUser.getUserName());
        assertEquals("Updated Password", existingUser.getUserPassword());
        assertEquals("Updated Description", existingUser.getUserDescription());
    }

    @Test
    void shouldUpdateUser_NonExistingUser() {
        int userId = 1;
        UserCommand userCommand = new UserCommand();
        userCommand.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> userService.update(userCommand));
    }

    @Test
    void shouldDeleteUser() {
        int userId = 1;

        userService.delete(userId);

        verify(userRepository).deleteById(userId);
    }

    @Test
    void shouldDeleteUser_ZeroId() {
        int userId = 0;

        String result = userService.delete(userId);

        assertEquals("User deleted!", result);
        verify(userRepository, never()).deleteById(userId);
    }
}
