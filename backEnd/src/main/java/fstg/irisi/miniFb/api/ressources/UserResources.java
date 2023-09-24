package fstg.irisi.miniFb.api.ressources;

import fstg.irisi.miniFb.api.common.ResourcePath;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.representations.UserRepresentation;
import fstg.irisi.miniFb.services.UserService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ResourcePath.USER)
@RequiredArgsConstructor
@Slf4j
@Data
public class UserResources {
    private final UserService userService;
    @GetMapping("/{id}")
    public ResponseEntity<UserRepresentation> getUerById(@PathVariable Integer id){
        return ResponseEntity.ok(userService.getById(id));
    }

    @PutMapping
    public ResponseEntity<UserRepresentation> updateUser(@RequestBody UserCommand userCommand){
        return ResponseEntity.ok(userService.update(userCommand));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id){
        return ResponseEntity.ok(userService.delete(id));
    }
}
