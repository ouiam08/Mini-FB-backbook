package fstg.irisi.miniFb.api.ressources;

import fstg.irisi.miniFb.api.common.ResourcePath;
import fstg.irisi.miniFb.domain.command.CommentCommand;
import fstg.irisi.miniFb.domain.representations.CommentRepresentation;
import fstg.irisi.miniFb.services.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(ResourcePath.COMMENT)
@RequiredArgsConstructor
@Slf4j
public class CommentResources {

    private final CommentService commentService;


    @GetMapping
    public ResponseEntity<List<CommentRepresentation>> getAllComments() {
        return ResponseEntity.ok(commentService.getAll());
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentRepresentation>> getCommentsByPostId(@PathVariable int postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @PostMapping
    public ResponseEntity<Integer> insertComment(@RequestBody CommentCommand commentCommand) {
        log.info("Adding a new comment: {}", commentCommand);
        return ResponseEntity.ok(commentService.create(commentCommand));
    }


    @PutMapping
    public ResponseEntity<CommentRepresentation> updateComment(@RequestBody CommentCommand commentCommand) {
        return ResponseEntity.ok(commentService.update(commentCommand));
    }


    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable int commentId) {
        return ResponseEntity.ok(commentService.delete(commentId));
    }
}
