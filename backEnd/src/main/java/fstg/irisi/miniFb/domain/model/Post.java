package fstg.irisi.miniFb.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;
    private String postBody;
    @Lob
    private byte[] postPhoto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private FBUser postOwner;
    private LocalDateTime postTime;

    @OneToMany(mappedBy = "commentPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "postReaction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reaction> reactions;

}