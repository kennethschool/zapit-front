import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/icons/social-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const team = [
  {
    name: "Isikena (Ken) Mate",
    role: "CEO & Founder",
    bio: "Full-stack developer, aspiring cyber secuirty technician.",
    avatar: "/images/default_person_image.jpg",
    initials: "IM",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
];

export function TeamSection() {
  return (
    <section className="hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The dream team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-background rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-xl">
                {member.initials}
              </AvatarFallback>
            </Avatar>

            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-primary font-medium mb-2">{member.role}</p>
            <p className="text-muted-foreground mb-4">{member.bio}</p>

            <div className="flex justify-center space-x-3">
              <a
                href={member.social.twitter}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href={member.social.linkedin}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href={member.social.github}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
