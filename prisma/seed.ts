import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const categories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Client projects',
    projects: {
      create: [
        {
          name: "Osopox",
          summary: `We make web applications, mobile apps, API’s and USSD apps. all of this helps you reach as much user as possible without worrying about the user ability`,
          image: "https://res.cloudinary.com/diuabaqkt/image/upload/v1745410153/PNG_image_d520c214cc.png",
          url: "https://osopox.com/",
          order: 1
        },
        {
          name: "Iyawe Art",
          summary: `Iyawe Art Collection is art supplies, handcrafted décor, original paintings, and custom-made apparel, all proudly made in Rwanda..`,
          image: "https://iyawe.art/wp-content/uploads/2025/04/cropped-WhatsApp-Image-2025-01-18-at-13.45.41-1.jpeg",
          url: "https://iyawe.art/",
          order: 2
        },
        {
          name: "Ibiciro",
          summary: "Ibiciro.com is a dynamic web platform that allows multiple sellers to display their prices for a wide range of products and services. ",
          image: "https://res.cloudinary.com/youdes/image/upload/v1736509300/portofolio/vzg9zmxnqbpukisuhwa7.png",
          url: "https://ibiciro.com/",
          order: 3
        },
        {
          name: "Ballerzone",
          summary: "Ballerzone is a dynamic platform dedicated to delivering comprehensive basketball content and experiences to fans around the world, with a special focus on the African continent",
          image: "https://res.cloudinary.com/diuabaqkt/image/upload/v1721472660/Untitled_design_58399d9dea.png",
          url: "https://ballerzone.africa/",
          order: 4
        },
        {
          name: "Ubaka RW",
          summary: "Hello, we are UBAKA. Our goal is to translate the positive effects from revolutionizing how companies engage with their clients & their team.",
          image: "https://www.ubaka.rw/logo-base-light.png",
          url: "https://ballerzone.africa/",
          order: 5
        },
      ]
    }
  },
  {
    name: 'Personal projects',
    projects: {
      create: [
        {
          name: "Quick News",
          summary: "Get news from all popular news website in one place. search by any keyword",
          image: "https://res.cloudinary.com/youdes/image/upload/v1732690222/portofolio/ag9uclsw6w9up0btsqak.jpg",
          url: "https://jeunih0001.pythonanywhere.com/",
          order: 6
        },
        {
          name: "Spotify Stats",
          summary: "Dive into your personalized Spotify data and uncover your listening habits. Analyze your favorite tracks, artists, and playlists like never before.",
          image: "https://res.cloudinary.com/youdes/image/upload/v1744383497/portofolio/umapjfkwfhtmglc3mqlw.png",
          url: "https://spotify-custom-wrapped.vercel.app/",
          "order": 7,
        },
      ]
    }
  },
  {
    name: 'UI/Templates',
    projects: {
      create: [
        {
          name: "LicenseEase Template",
          summary: "Licensing web app nextjs template",
          image: "https://res.cloudinary.com/youdes/image/upload/v1744570343/portofolio/xrc4i4yggoodjdit1bej.png",
          url: "https://licenseease.vercel.app/",
          order: 1
        }
      ]
    }
  }
]

const tools: Prisma.ToolCreateInput[] = [
  {
    "name": "nextjs",
    "icon": "https://res.cloudinary.com/youdes/image/upload/v1727895216/portofolio/smmwlgg8ch1jpx2ip3ut.png",
    order: 1
  },
  {
    "name": "laravel",
    "icon": "https://res.cloudinary.com/youdes/image/upload/v1727895336/portofolio/ejsvpkuepmx092bpcigd.png",
    order: 1
  },
  {
    "name": "python",
    "icon": "https://res.cloudinary.com/youdes/image/upload/v1727895519/portofolio/emkspt4mjdp8nolhduky.png",
    order: 1
  },
  {
    "name": "Javascript",
    "icon": "https://res.cloudinary.com/youdes/image/upload/v1740994885/portofolio/rojcq81rgsiarikast7g.svg",
    order: 1
  },
  {
    "name": "Django",
    "icon": "https://res.cloudinary.com/youdes/image/upload/v1740994789/portofolio/ck6nipn9dbapuvxboniq.svg",
    order: 1
  },
  {
    "name": "Wordpress",
    "icon": "data:image/png;base64,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",
    order: 1
  },
]

export async function main() {
  for (const c of categories) {
    await prisma.category.create({ data: c })
  }

  for (const t of tools) {
    await prisma.tool.create({ data: t })
  }

  await prisma.content.create({
    data: {
      hero_title_first_line: '👋, I am Jean Eudes',
      hero_title_second_line: 'FullStack',
      hero_title_third_line: 'Web Developer',
      about_me_title: 'About Me',
      about_me_description: "Hey there! I'm a passionate fullstack web developer with a knack for bringing ideas to life through code. I'm flexible and always up for learning new technologies to get the job done.",
      my_tools_title: 'Tools & frameworks I use',
      my_projects_title: 'My Projects',
      contact_me_title: 'Contact Me',
      contact_me_description: "If you have any questions or are interested in working together, please complete the form below to reach out"
    }
  })

  await prisma.link.createMany({
    data: [
      {
        name: 'GitHub',
        url: 'https://github.com/jeaneudes23'
      },
      {
        name: 'Linkedin',
        url: "https://www.linkedin.com/in/nihangaza-jean-eudes-73a803264/",
      }
    ]
  })

  await prisma.metadata.create({
    data: {
      title: 'Jean Eudes Nihangaza',
      description: 'Web Developer Based In Rwanda',
      keywords: ['web', 'developer', 'web developer', 'software developer'],
      image: "https://hoopshype.com/lists/78-greatest-nba-players-ever-hoopshype-list/"
    }
  })
}

main()