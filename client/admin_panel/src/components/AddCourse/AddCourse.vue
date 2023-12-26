<template>
  <section class="addCourse">
    <BlueButton180 @click="$emit('update:modelValue', 0)">
      Назад
    </BlueButton180>
    <v-form v-model="valid" ref="form">
      <!-- Create Course Start -->
      <AddCourseMain
        v-if="faculties && eduTypes && diplomType && courseAdditional"
        :faculties="faculties"
        :eduTypes="eduTypes"
        :diplomType="diplomType"
        :courseAdditional="courseAdditional"
        v-model:MainValidProp="MainValid"
        v-model:CourseProp="Course"
      ></AddCourseMain>

      <!-- Change Course Info Start -->
      <AddCourseInfo
        v-model:InfoValidProp="InfoValid"
        v-model:InfoProp="Info"
      ></AddCourseInfo>
      <!-- Add Course Section -->
      <AddCourseSection
        v-model:SectionValidProp="SectionValid"
        v-model:SectionsProp="Sections"
      ></AddCourseSection>

      <!-- && InfoValid && SectionValid -->
      <blue-button-full
        :isDisabled="MainValid === false"
        @click="AddCourse(Course, Info, Sections)"
      >
        Создать курс
      </blue-button-full>
    </v-form>
  </section>
</template>

<script>
import AddCourseMain from "./Course__Main.vue";
import AddCourseInfo from "./Course__Info.vue";
import AddCourseSection from "./Course__Section.vue";

import axios from "axios";
export default {
  components: {
    AddCourseMain,
    AddCourseInfo,
    AddCourseSection,
  },
  props: {
    select: Number,
    faculties: Array,
    eduTypes: Array,
    diplomType: Array,
    courseAdditional: Array,
  },
  data() {
    return {
      // Create Course
      MainValid: false,
      Course: {
        CourseName: "",
        FacultyName: "",
        EduTypesName: "",
        DiplomTypesName: "",
        CourseAdditionalName: "",
        File: false,
        MinHours: 0,
      },

      // Change Course Info
      InfoValid: false,
      Info: {
        AuthorName: "",
        MinMaxHours: "",
        CourseGoal: "",
        EducationForm: "",
        CertificationType: "",
        AuthorInfo: ["", "", "", ""],
      },

      // Add Section
      SectionValid: false,
      Sections: [],
      // to do:
      // module validation
    };
  },
  methods: {
    async AddCourse(Main, Info, Sections) {
      const main_res = await this.AddMain(Main);

      const info_res = await this.AddInfo(main_res.data.id, Info);

      await this.addAuthorInfo(info_res.data.id, Info.AuthorInfo);

      for (const section of Sections) {
        const s_res = await this.AddSection(info_res.data.id, section);

        for (const module of section.modules) {
          const m_res = await this.AddModule(s_res.data.id, module);

          for (const task of module.tasks) {
            if (task.videolectionName) {
              await this.AddVideolection(m_res.data.id, task);
            } else if (task.lessonName) {
              const v_res = await this.AddLection(m_res.data.id, task);

              for (const lecBlock of task.lectionBlocks) {
                await this.AddLectionBlock(v_res.data.id, lecBlock);
              }
            } else if (task.testName) {
              const v_res = await this.AddTest(m_res.data.id, task);
              for (const question of task.testQuestions) {
                const q_res = await this.AddTestQuestion(
                  v_res.data.id,
                  question
                );
                for (const variants of question.testQuestionVariants) {
                  await this.AddQuestionVariant(q_res.data.id, variants);
                }
              }
            } else if (task.examName) {
              await this.AddExam(m_res.data.id, task);
            }
          }
        }
      }
    },

    async AddMain(Main) {
      let formdata = new FormData();

      const educationTypeId = this.eduTypes.find(
        (edu) => edu.name === Main.EduTypesName
      ).id;
      const facultyId = this.faculties.find(
        (fac) => fac.name === Main.FacultyName
      ).id;
      const DiplomTypesName = this.diplomType.find(
        (dip) => dip.name === Main.DiplomTypesName
      ).id;
      let coursesToAdditionalId;
      if (Main.CourseAdditionalName) {
        coursesToAdditionalId = this.courseAdditional.find(
          (adi) => adi.name === Main.CourseAdditionalName
        ).id;
      }
      formdata.append("authorId", "1");
      formdata.append("courseName", Main.CourseName);
      formdata.append("educationTypeId", educationTypeId);
      formdata.append("facultyId", facultyId);
      formdata.append("diplomTypeId", DiplomTypesName);
      formdata.append("minHours", +Main.MinHours);
      formdata.append("file", Main.File[0]);
      if (Main.CourseAdditionalName) {
        formdata.append("coursesToAdditionalId", coursesToAdditionalId);
      }

      const URL = "http://localhost:3000/course/addCourse";
      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
    async AddInfo(CourseId, Info) {
      const URL = "http://localhost:3000/course/changeCourseInfo/" + CourseId;
      const res = await axios.put(URL, {
        authorName: Info.AuthorName,
        minMaxHours: Info.MinMaxHours,
        courseGoal: Info.CourseGoal,
        educationForm: Info.EducationForm,
        certificationType: Info.CertificationType,
      });
      return res;
    },
    async addAuthorInfo(CourseInfoId, authorInfo) {
      const URL = "http://localhost:3000/course/addAuthorInfo/" + CourseInfoId;
      let res = [];
      for (const info of authorInfo) {
        const info_res = await axios.post(URL, {
          aboutAuthor: info,
        });
        res.push(info_res);
      }
      return res;
    },
    async AddSection(CourseInfoId, Section) {
      const URL = "http://localhost:3000/course/addSection/" + CourseInfoId;
      const res = await axios.post(URL, {
        hoursAmount: +Section.hoursAmount,
        cost: +Section.cost,
        cashback: +Section.cashback,
      });
      return res;
    },
    async AddModule(SectionId, Module) {
      const URL = "http://localhost:3000/course/addModule/" + SectionId;
      const res = await axios.post(URL, {
        hoursAmount: +Module.hoursAmount,
        moduleName: Module.moduleName,
      });
      return res;
    },

    async AddVideolection(ModuleId, Task) {
      let formdata = new FormData();

      formdata.append("file", Task.files[0][0], "file1");
      formdata.append("file", Task.files[1][0], "file2");
      formdata.append("queueNumber", "1");
      formdata.append("lessonName", Task.videolectionName);
      formdata.append("descriptionHeader", Task.descriptionHeader);
      formdata.append("descriptionContent", Task.descriptionContent);
      formdata.append("homeworkName", Task.homeworkName);
      formdata.append("homeworkDesription", Task.homeworkDesription);

      const URL = "http://localhost:3000/course/addVideoLection/" + ModuleId;
      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },

    async AddLection(ModuleId, Task) {
      let formdata = new FormData();

      formdata.append("file", Task.homeworkFile[0], "file1");
      formdata.append("queueNumber", "1");
      formdata.append("lessonName", Task.lessonName);
      formdata.append("homeworkName", Task.homeworkName);
      formdata.append("homeworkDesription", Task.homeworkDesription);

      const URL = "http://localhost:3000/course/addLection/" + ModuleId;
      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
    async AddLectionBlock(LectionId, LectionBlock) {
      let formdata = new FormData();

      formdata.append("file", LectionBlock.img[0], "file1");
      formdata.append("header", LectionBlock.header);
      formdata.append("text", LectionBlock.text);

      const URL = "http://localhost:3000/course/addLectionBlock/" + LectionId;
      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },

    async AddTest(ModuleId, Task) {
      const URL = "http://localhost:3000/course/addTest/" + ModuleId;
      const res = await axios.post(URL, {
        lessonName: Task.testName,
        queueNumber: 1,
        descriptionHeader: Task.descriptionHeader,
        descriptionContent: Task.descriptionContent,
        timeForPass: +Task.timeForPass,
        questionsAmount: +Task.questionsAmount,
        maxPoints: +Task.maxPoints,
        pointForPass: +Task.pointForPass,
      });
      return res;
    },
    async AddTestQuestion(TestId, Question) {
      let formdata = new FormData();

      formdata.append("questionImg", Question.questionImg[0], "questionImg");
      formdata.append("queueNumber", "1");
      formdata.append("questionType", Question.questionType);
      formdata.append("questionHeader", Question.questionHeader);

      const URL = "http://localhost:3000/course/addTestQuestion/" + TestId;
      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
    async AddQuestionVariant(QuestionId, Variant) {
      const URL =
        "http://localhost:3000/course/addTestQuestionVariant/" + QuestionId;
      const res = await axios.post(URL, {
        queueNumber: 1,
        variantText: Variant.variantText,
        isTrue: Variant.isTrue,
      });
      return res;
    },

    async AddExam(ModuleId, Task) {
      console.log("Task = ", Task);
      let formdata = new FormData();

      formdata.append("file", Task.files[0][0], "img");
      formdata.append("file", Task.files[1][0], "homeworkPDF");
      formdata.append("queueNumber", "1");
      formdata.append("lessonName", Task.examName);
      formdata.append("header", Task.header);
      formdata.append("text", Task.text);
      formdata.append("homeworkName", Task.homeworkName);
      formdata.append("homeworkDesription", Task.homeworkDesription);

      const URL = "http://localhost:3000/course/addExam/" + ModuleId;
      const res = await axios.post(URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
.v-form {
  min-width: 300px;
}
h2 {
  margin-top: 30px;
}
.v-btn {
  margin-top: 20px;
}
</style>
