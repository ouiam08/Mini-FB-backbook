package fstg.irisi.miniFb.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class FBUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String userName;
    private String userPassword;
    private String userDescription;
    @Lob
    @Column(columnDefinition = "BYTEA")
    private byte[] userPhoto;

    @OneToMany(mappedBy = "commentOwner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "postOwner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @OneToMany(mappedBy = "reactingUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reaction> reactions;


}
