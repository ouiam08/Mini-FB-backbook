package fstg.irisi.miniFb.api.ressources;

import fstg.irisi.miniFb.api.common.ResourcePath;
import fstg.irisi.miniFb.domain.model.Reaction;
import fstg.irisi.miniFb.domain.representations.ReactionRepresentation;
import fstg.irisi.miniFb.services.ReactionService;
import fstg.irisi.miniFb.domain.command.ReactionCommand;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping(ResourcePath.REACTION)
@RequiredArgsConstructor
@Slf4j
public class ReactionResources {
     private final ReactionService reactionService;

    @GetMapping
    public ResponseEntity<List<ReactionRepresentation>> getAllReactions() {
        return ResponseEntity.ok(reactionService.getAll());
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<ReactionRepresentation>> getReactionsByPostId(@PathVariable int postId) {
        return ResponseEntity.ok(reactionService.getByPostId(postId));
    }

    @PostMapping
    public ResponseEntity<Integer> createReaction(
            @RequestBody ReactionCommand reactionCommand) {
        return  ResponseEntity.ok(reactionService.create(reactionCommand));
    }

    @PutMapping
    public ResponseEntity<ReactionRepresentation> updateReactionType(
        @RequestBody ReactionCommand reactionCommand) {
    return ResponseEntity.ok(reactionService.update(reactionCommand));
}

    @DeleteMapping("/{reactionId}")
    public ResponseEntity<String> deleteReaction(@PathVariable int reactionId) {
        return ResponseEntity.ok( reactionService.delete(reactionId));
    }

}
